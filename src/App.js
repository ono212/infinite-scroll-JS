import { requestRandomPhoto } from "./api.js";
import PhotoList from "./PhotoList.js";

export default function App({ $target }) {
  const $h1 = document.createElement("h1");
  $h1.innerText = "📷Unsplash 사진첩📸";
  $h1.style.textAlign = "center";
  $target.appendChild($h1);

  const $h3 = document.createElement("h3");
  $h3.innerText = "무한 스크롤로 구현된 사진첩입니다.😎";
  $h3.style.textAlign = "center";
  $target.appendChild($h3);

  this.state = {
    page: 1,
    photos: [],
    isLoading: false,
  };

  const photoListComponent = new PhotoList({
    $target,
    initialState: {
      photos: this.state.photos,
      isLoading: this.state.isLoading,
    },
    onScrollEnded: async () => await fetchPhotos(), // {}없이 써도 되는지?
  });

  this.setState = (nextState) => {
    this.state = nextState;

    photoListComponent.setState({
      isLoading: this.state.isLoading,
      photos: this.state.photos,
    });
  };

  const fetchPhotos = async () => {
    this.setState({
      ...this.state,
      isLoading: true,
    });

    const photos = await requestRandomPhoto(`/photos?page=${this.state.page}`);

    this.setState({
      ...this.state,
      isLoading: false,
      photos: [...this.state.photos, ...photos],
      page: this.state.page + 1,
    });
  };

  this.initialRender = async () => {
    await fetchPhotos();
  };

  this.initialRender();
}
