import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../component/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get("http://localhost:5555/books/");
        console.log(response)
        setBooks(response.data.data);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Failed to load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        <Link to="/books/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl cursor-pointer" />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : books.length > 0 ? (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Title</th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Author
              </th>
              <th className="border border-slate-600 rounded-md max-md:hidden">
                Publish Year
              </th>
              <th className="border border-slate-600 rounded-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {book.title || "N/A"}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.author || "N/A"}
                </td>
                <td className="border border-slate-700 rounded-md text-center max-md:hidden">
                  {book.publishYear || "N/A"}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/books/details/${book._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800 cursor-pointer" />
                    </Link>
                    <Link to={`/books/edit/${book._id}`}>
                      <AiOutlineEdit className="text-2xl text-yellow-600 cursor-pointer" />
                    </Link>
                    <Link to={`/books/delete/${book._id}`}>
                      <MdOutlineDelete className="text-2xl text-red-600 cursor-pointer" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-gray-500">No books available.</p>
      )}
    </div>
  );
};

export default Home;
