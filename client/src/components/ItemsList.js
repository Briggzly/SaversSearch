import React from "react";
import Item from "./Item";

const ItemsList = ({ items }) => {
    const renderedList = items.map((item) => {
        return (
            <Item />
        )
    }) 
}

export default ItemsList;