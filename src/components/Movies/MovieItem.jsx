import React from 'react';

function MovieItem(props) {
    const {vote_average, title, backdrop_path, poster_path} = props.item;
    return(
        <div className="card h-100" style={{width: '100%'}}>
            <img className="card-img-top card-img--height" src={`https://image.tmdb.org/t/p/w500${poster_path || backdrop_path}`} alt={title}/>
            <div className="card-body">
                <h6 className="card-title">{title}</h6>
                <div className="card-text">Рейтинг: {vote_average}</div>
            </div>
        </div>
    )
}
export default MovieItem;