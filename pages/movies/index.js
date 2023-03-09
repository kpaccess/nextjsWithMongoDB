import clientPromise from "../../lib/mongodb";

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db();

    const movies = await db
      .collection("movies")
      .find({})
      .sort({ meacritic: -1 })
      .limit(20)
      .toArray();

    return {
      props: { movies: JSON.parse(JSON.stringify(movies)) },
    };
  } catch (e) {
    console.error(e);
  }
}

export default function Movies({ movies }) {
  return (
    <div>
      <h1>Top 20 movies of All Time</h1>
      <p>
        <small>(According to Metacritic)</small>
      </p>
      <ul>
        {movies.map((movies) => {
          const { title, metacritic, plot, id } = movies;
          <li key={id}>
            <h2>{title}</h2>
            <h3>{metacritic}</h3>
            <p>{plot}</p>
          </li>;
        })}
      </ul>
    </div>
  );
}
