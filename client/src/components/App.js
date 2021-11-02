import React, { useState } from "react"; 
import SearchBar from "./SearchBar";

const App = () => {
    const [term, setTerm] = useState('')


    return (
        <div>
            <SearchBar setTerm={setTerm} />
        </div>
    )
}

export default App