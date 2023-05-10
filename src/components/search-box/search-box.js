import { useContext } from 'react';
import { MdSearch } from 'react-icons/md';

import { notesContext } from '../../context';

import "./search-box.scss"

const SearchBox = () => {
    const useNotesContext = useContext(notesContext);
        return (
            <div className='search'>
                <MdSearch className='search-icons' size='1.3em' />
                <input
                    type='text'
                    placeholder='Search'
                    onChange={(e)=>useNotesContext.searchChange(e.target.value)}
                />
            </div>
        );
}
export default SearchBox;