import { Inter } from "next/font/google";
import Header from "../components/Header";
import Banner from "@/components/Banner";
import requests from "@/utils/requests";
import { Movie } from "@/typings";
import Row from "@/components/Row";
import useAuth from "@/hooks/useAuth";
import { useRecoilValue } from "recoil";
import { modalState, movieState } from "@/atoms/modalAtom";
import Modal from "@/components/Modal";
import Plans from "@/components/Plans";
import { Product, getProducts } from "@stripe/firestore-stripe-payments";
import payments from "@/lib/stripe";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import useSubscription from "@/hooks/useSubscription";
import useList from "@/hooks/useList";

const inter = Inter({ subsets: ["latin"] });

interface Props {
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  products: Product[];
}

export default function Home({
  netflixOriginals,
  actionMovies,
  comedyMovies,
  documentaries,
  horrorMovies,
  romanceMovies,
  topRated,
  trendingNow,
  products,
}: Props) {
  const { loading, user } = useAuth();
  const showModal = useRecoilValue(modalState);
  const movie = useRecoilValue(movieState);
  const list = useList(user?.uid);
  // const subscription = useSubscription(user);
  const subscription = true;

  if (loading || subscription === null) return null;

  if (!subscription) return <Plans products={products} />;

  return (
    <div
      className={`relative h-screen bg-gradient-to-b lg:h-[140vh] ${
        showModal && `!h-screen overflow-hidden`
      }`}
    >
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* My List Component */}
          {list.length > 0 && <Row title="My List" movies={list}/>}
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
        {showModal && <Modal />}
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  let products: Product[] = [];
  await getDocs(collection(db, "products"))
    .then((querySnapshot) => {
      products = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
    })
    .catch((error) => console.log(error));

  // Only get active products
  const filteredProducts = products.filter(
    (product) => product.active === true
  );

  // const products = await getProducts(payments, {
  //   includePrices: true,
  //   activeOnly: true,
  // })
  //   .then((res) => res)
  //   .catch((error) => console.log(error.message));

  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      products,
    },
  };
};
