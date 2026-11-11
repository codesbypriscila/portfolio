const imagePath = (name: string) => `/images/about/${name}`;

export const aboutImages = {
  cover: { src: imagePath("book-cover.png"), width: 1120, height: 1120 },
  leather: { src: imagePath("leather.png"), width: 1040, height: 1040 },
  pageLeft: { src: imagePath("page-left.png"), width: 1040, height: 1040 },
  pageRight: { src: imagePath("page-right.png"), width: 1040, height: 1040 },
  photo: { src: imagePath("priscila.jpg"), width: 770, height: 770 },
  clip: { src: imagePath("sticker-clip-shadow.png"), width: 219, height: 612 },
  cookie: { src: imagePath("cookie-shadow.png"), width: 690, height: 692 },
  cheesecake: { src: imagePath("cheesecake-shadow.png"), width: 520, height: 457 },
  narutoTeam: { src: imagePath("naruto-team.jpg"), width: 706, height: 1013 },
  naruto: { src: imagePath("naruto-shadow.png"), width: 574, height: 1021 },
};

/** Eight pages shown two at a time. The words on them live in the dictionaries (`src/i18n`). */
export const bookPageCount = 8;

export const ownerName = "Priscila Pérez";
