import { modalState, movieState } from "@/atoms/modalAtom";
import { Movie } from "@/typings";
import { DocumentData } from "firebase/firestore";
import Image from "next/image";
import { useRecoilState } from "recoil";

interface Props {
  movie: Movie | DocumentData
}

function Thumbnail({ movie }: Props) {
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState);

  return (
    <div
      className="relative h-28 min-w-[180px] cursor-pointer transition duration-200
      ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie);
        setShowModal(true);
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        fill
        alt="movie"
        priority={true}
        sizes="(max-width: 768px) min-width: 260px, min-width: 180px "
      />
    </div>
  );
}

export default Thumbnail;
