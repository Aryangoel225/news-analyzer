
function Card({source, onRemove}){
    return(
        <div className="card"> 
            <h3>{source.name}</h3>
            {source.url &&  (<img src={`https://www.google.com/s2/favicons?domain=${source.url}`} 
            alt={`${source.name} logo`} />
        )}
            <p>{source.description}</p>
            <button onClick={() => onRemove(source)}>Remove</button>
        </div>

        
    );
}

export default Card;