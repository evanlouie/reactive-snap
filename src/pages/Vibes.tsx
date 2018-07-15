import React, { StatelessComponent } from "react";

const Vibes: StatelessComponent = () => {
  const vibes: string[] = [
    "PmwX9nlW8Sw",
    "5SDJFvG2dKk",
    "32GKV2ky6_s",
    "PB0HXiEV_kw",
    "vWUHoAGRTHU",
    "A0DHLDjQhaU",
    "eSH7QSzkhQg",
    "7HaVLTh6Lrg",
    "fok6KVw-jT0",
    "wUL3sG7YX2M",
    "tpUi8-Rc5m4",
    "hAd5BdhdMkY",
    "uh23W5jYpas",
    "rfdzSlR8TxE",
    "pHtWQ2aRkU8",
    "s6-XjV8ZVjg",
    "YgylESfSPBg",
    "Fn7-9mI06U4",
    "9XdoEw8lixg",
    "P0F1vYoSYgU",
    "fbhPevC3rPg",
    "rDZKTrhLRdU",
    "DyBPLYGYRWY",
    "duv0Yqb3NaU",
    "fxu_VTpGoVM",
    "SmLJqVLYFtM",
    "1Nzl-rUauIA",
    "TUvi-4goP7s",
    "xA-_8JJC-so",
    "osVlUMRZ2so",
    "1wa1KDM0P6w",
    "W3Pc7ZQggoE",
    "EU8j-gDtC18",
    "H8l7JA-LQVA",
    "qIN4jQ7TgmY",
    "TdBSoy9F9NA",
    "jww3TshT9ZM",
    "JPfE3JJkot0",
    "nPiQJfyK_i8",
    "7Cfu39jnQhE",
    "_WTCIK9SkKU",
    "nPyihvohLPY",
    "wbBSeyHYv8c",
    "yUf8ErSyvys",
    "gOgwZk_e4TA",
    "k9e0caOz1ww",
    "qUFBP2hI2jU",
    "j1oCi5VrEtA",
    "3txqEEE0zeg",
    "0ILnF7p2eiw",
    "sBZ78RBQ6ZI",
    "-TGNIh4XeaY",
    "YaJ3exPculA",
    "8d82SrPn_Ss",
    "ISUmbcFsWpM",
  ];

  return (
    <div
      className="Vibes"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(25%, 1fr))",
      }}
    >
      {vibes.map((youtubeId) => (
        <iframe
          key={youtubeId}
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
          width="560"
          height="315"
          frameBorder="0"
          allowFullScreen={true}
        />
      ))}
    </div>
  );
};

export default Vibes;
