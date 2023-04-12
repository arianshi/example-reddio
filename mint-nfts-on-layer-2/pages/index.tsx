import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useEffect } from "react";
import { addStarkKey } from "@/utils/store";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { goerli } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import "@rainbow-me/rainbowkit/styles.css";
import { initReddio } from "@/utils/config";

const inter = Inter({ subsets: ["latin"] });

const { chains, provider } = configureChains(
  [goerli],
  [
    alchemyProvider({ apiKey: "fLZl25gQrNAZBoxSx5FM8D7reAd4U1_I" }),
    publicProvider(),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function Home() {
  // initReddio is asynchronous function
  useEffect(() => {
    initReddio(wagmiClient);
    // let i = 0;
    // const init = async () => {
    //   if (i > 1) {
    //     return;
    //   }
    //   const { publicKey, privateKey } =
    //     await reddio.keypair.generateFromEthSignature();
    //   console.log(publicKey, privateKey);
    //   addStarkKey(publicKey);
    // };
  }, [initReddio]);

  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Head>
          <title>Create Next App</title>
          <meta name="description" content="Generated by create next app" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <div className={styles.description}>
            <div>
              <ConnectButton />
            </div>
          </div>

          <div className={styles.center}>
            <Image
              className={styles.logo}
              src="/next.svg"
              alt="Next.js Logo"
              width={180}
              height={37}
              priority
            />
          </div>

          <div className={styles.grid}>
            <a
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
              className={styles.card}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h2 className={inter.className}>
                Docs <span>-&gt;</span>
              </h2>
              <p className={inter.className}>
                Find in-depth information about Next.js features and&nbsp;API.
              </p>
            </a>
          </div>
        </main>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
