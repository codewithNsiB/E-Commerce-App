import { useRef } from "react";


export default function useScroll(){
    const scrollRef = useRef()

    const scroll = (direction) => {
        const { current } = scrollRef;
        direction === "left"
          ? (current.scrollleft -= 500)
          : (current.scrollleft += 500);
      }
      return{scroll, scrollRef}
}

