import { useSearch } from '@/hooks/useSearch.tsx';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, InputGroup } from 'react-bootstrap';

export default function Search() {
    const { search, setSearch } = useSearch();

    return (
        <InputGroup className="mb-3">
            <InputGroup.Text className={'bg-black'}>
                <FontAwesomeIcon icon={faSearch} />
            </InputGroup.Text>
            <Form.Control
                placeholder={'Search'}
                autoFocus={true}
                value={search}
                onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
        </InputGroup>
    );
}
