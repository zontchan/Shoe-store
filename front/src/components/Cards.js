import Item from "./Item";
import Preloader from "./Preloader";
export default function Cards({catalog, loading}) {

    return (
        <div className="row items">
            {catalog.map((o) => <Item key={o.id} product={o}/>)}
            {loading && <Preloader/>}
        </div>
    );
}