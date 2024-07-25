//this is for changing title in react//

import { useEffect } from "react"

const Home = () => {
    useEffect(() => {
        document.title = "Todo-Application";
    },[])
}

export default Home;