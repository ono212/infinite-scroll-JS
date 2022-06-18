const API_END_POINT = "https://api.unsplash.com";

const ACCESS_KEY = process.env.ACCESS_KEY;

export const requestRandomPhoto = async (url) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      headers: {
        Authorization: `Client-ID ${ACCESS_KEY}`,
      },
    });

    if (!res.ok) {
      throw new Error("요청에 ㅅ..시..시실..시실..실패했습니다😫");
    }

    return await res.json();
  } catch (e) {
    alert(e.message);
  }
};
