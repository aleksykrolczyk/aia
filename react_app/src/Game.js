import React from "react"


function Game(props) {
    return (
        <tr>
            <th scope="col" className="table-image">
                <img
                    src={"https://picsum.photos/100/50?grayscale"}
                    alt="Missing"
                />
            </th>


            <th scope="col" className="table-name">
                {!props.data.edit ?
                    <p> {props.data.name} </p>
                    :
                    <input type="text"
                           name="name"
                           value={props.data.name}
                           onChange={event => props.change(event, props.data.id)}
                    />
                }
            </th>

            <th scope="col" className="table-rating">
                {!props.data.edit ?
                    <p> {props.data.rating} </p>
                    :
                    <input type="number"
                           name="rating"
                           value={props.data.rating}
                           onChange={event => props.change(event, props.data.id)}
                    />
                }
            </th>

            <th scope="col" className="table-description">
                {!props.data.edit ?
                    <p> {props.data.description} </p>
                    :
                    <input type="text"
                           name="description"
                           value={props.data.description}
                           onChange={event => props.change(event, props.data.id)}
                    />
                }
            </th>

            <th className="table-buttons">


                {!props.data.edit ?
                    <button className="btn btn-secondary"
                            onClick={() => props.edit(props.data.id)}>
                        Edit
                    </button>
                    :
                    <button className="btn btn-success"
                            onClick={() => props.edit(props.data.id)}>
                        Save
                    </button>
                }

                <button className="btn btn-danger"
                        onClick={() => props.delete(props.data.id)}>
                    Delete
                </button>
            </th>
        </tr>
    )
}

export default Game