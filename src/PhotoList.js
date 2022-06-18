export default function PhotoList({ $target, initialState, onScrollEnded }) {
  let isInitialized = false;

  const $photoList = document.createElement("div");
  $target.append($photoList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      /*
      li가 겹쳐졌을 때, 그리고 isLoaing이 false일 때 Api를 요청한다.
      이미 isLoading === true인 상황에서 또 Api가 요청되는 경우를 막기 위함이다.
      */
      if (entry.isIntersecting && !this.state.isLoading) {
        // Api 요청
        onScrollEnded();

        // 기존에 등록된 li요소는 해제해야한다. 해제하지않으면 스크롤을 다시 올렸을 때 예전에 등록한 li를 탐지한다.
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(callback, {
    threshold: 0.5, // 마지막 이미지의 절반이 걸쳐졌을 때를 탐지한다!
  });

  this.render = () => {
    // 첫 렌더링 때에만 ul 생성하도록 isInitialized 변수를 사용한다.
    if (!isInitialized) {
      $photoList.innerHTML = `
          <ul class="PhotoList_photos"></ul>
          `;
      isInitialized = true;
    }

    const { photos } = this.state;
    const $photosUl = $photoList.querySelector(".PhotoList_photos");

    photos.forEach((photo) => {
      if ($photosUl.querySelector(`li[data-id="${photo.id}"]`) === null) {
        const $li = document.createElement("li");
        $li.setAttribute("data-id", photo.id);
        $li.innerHTML = `<img src="${photo.urls.regular}" />`;

        $photosUl.appendChild($li);
      }
    });

    const $nextLi = $photosUl.querySelector("li:last-child");

    // 매번, 불러온 이미지들 중 마지막 이미지에 observer을 등록한다.
    if ($nextLi !== null) observer.observe($nextLi);
  };

  this.render();
}
