import React from "react"; 

const SearchBar = ({ setTerm }) => {
    return (
        <div>
            <form>
                <input type='text' placeholder='Search Here' onChange={(e) => setTerm(e.target.value)}/>
                <button>Search</button>
            </form>
        </div>
    )
}

export default SearchBar