// import axios from "axios"
// import { useEffect } from "react";
// import { useState } from "react";





// interface Posts {
//   id: number; // Unique identifier for each product
//   userId: number;
//   title: string;
//   body: string;

// }


// export default function plues() {
//   const [Posts, setPosts] = useState<Posts[]>([])

//   const getPosts = async () => {
//     const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
//     // console.log(res.data)
//     setPosts(res.data)
//   }
//   useEffect(() => {
//     getPosts()
//   }, [])

// return(
//           <div className="flex gap-3 flex-wrap">
//         {Posts.map((post) =>
//           <div key={post.id} className="bg-amber-700 w-1/4">
//             <p className="bg-black">{post.title}</p>
//             <p>{post.body}</p>
//             <p className="bg-amber-950">{post.userId}</p>
//           </div>
//         )}
//       </div>

// )


// }