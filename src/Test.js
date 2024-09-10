import React from "react";

export default function Test() {
    const list = [{ id: 1, name: "눈사람" },
    { id: 2, name: "얼음" },
    { id: 3, name: "김시형" },
    { id: 4, name: "지혜" }
    ];

    const personList = list.map((val) => 
            <div key={val.id}>
                <span>{val.id}</span>
                <span>{val.name}</span>
            </div>
        );

    return <div>{personList}</div>;
}