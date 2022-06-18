export default function PhotoList({ $target, initialState, onScrollEnded }) {
  let isInitialized = false;

  const $photoList = document.createElement("div");
  $target.append($photoList);

  this.state = initialState;

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.render = () => {
    // 첫 렌더링 때에만 ul 생성
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
  };

  this.render();
}
