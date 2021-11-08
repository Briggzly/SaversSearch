import React from "react"; 

const SearchBar = ({setAuth}) => {
    

    return (
        <div>
            <form>
                <input type='text' placeholder='Search Here' />
                <button type='submit'>Search</button>
            </form>
        </div>
    )
}

export default SearchBar