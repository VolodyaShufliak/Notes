import { MdSearch } from 'react-icons/md';
import "./search-box.scss"
const SearchBox = () => {
        return (
            <div className='search'>
                <MdSearch className='search-icons' size='1.3em' />
                <input
                    type='text'
                    placeholder='Search'
                />
            </div>
        );
}
export default SearchBox;