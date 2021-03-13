import Head from "next/head";

export default function EasterEgg() {
  return (
    <div>
      <Head>
        <title>Easter Egg</title>
        <link rel="icon" href="/schedule.png" />
      </Head>
      <img src="/deadpool.jpg" style={{ width: "100%", height: "100%" }}></img>
    </div>
  );
}
