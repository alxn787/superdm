import { CreatorCard } from "@/components/CreatorCard";

export default function Explore (){
    const creators = [
        {
            name: "Author Name 1",
            image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
            description: "Author descriptionjhbd",
            id: "fjdhbjdbvkdfbkvbdfkj",
        },
        {
            name: "Author Name 2",
            image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
            description: "Author description",
            id: "fjdhbjdbvkdfbkvbdfkj",
        },
        {
            name: "Author Name 3",
            image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
            description: "Author description",
            id: "httpwesdvcejkrve",
        },  
         {
            name: "Author Name 4",
            image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
            description: "Author description",
            id: "fjdhbjdbvkdfbkfvdfvbdfkj",
        },
        {
            name: "Author Name 5",
            image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
            description: "Author description",
            id: "fjdhbjdbvkdfhnhhbkvbdfkj",
        },
        {
            name: "Author Name 6",
            image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
            description: "Author description",
            id: "fjdhbjdbvkdfbkdfdfgdvbdfkj",
        },
         {
            name: "Author Name 7",
            image: "https://images.unsplash.com/photo-1544077960-604201fe74bc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1651&q=80",
            description: "Author description",  
            id: "fjdhbjdbvkdfhfnhnugbkvbdfkj",
        },
    ];
    return (
        <div>
          <div className="font-bold text-center text-2xl mb-8">
            Find your Favorite Creators
          </div>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
            {creators.map((creator, index) => (
              <CreatorCard key={index} creator={creator} />
            ))}
          </div>
        </div>
      );
      
}