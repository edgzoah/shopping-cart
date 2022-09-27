const Filter = (props) => {
    return (
        <div className="filter">
            <select className="filter__select" onChange={props.filter}>
                <option value="">All</option>
                <option value="PHONE">Phones</option>
                <option value="LAPTOP">Laptops</option>
            </select>
        </div>
    );
}


export default Filter;