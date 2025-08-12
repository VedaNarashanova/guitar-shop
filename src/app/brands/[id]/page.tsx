'use client';

import { useParams } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const FIND_BRAND_MODELS = gql`
  query FindBrandModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
      image
      price
    }
  }
`;

export default function BrandModelsPage() {
    const params = useParams();
    const brandId = params.id;

    const limit = 6; // 3 columns x 2 rows
    const [page, setPage] = useState(0);
    const guitarTypes = ['All', 'Electric', 'Acoustic', 'Bass'];
    const [selectedType, setSelectedType] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    const sortBy = { field: 'name', order: 'ASC' };

    const { loading, error, data } = useQuery(FIND_BRAND_MODELS, {
        variables: { id: brandId, sortBy },
        fetchPolicy: 'cache-and-network',
    });

    useEffect(() => {
        setPage(0);
    }, [searchTerm, selectedType]);

    if (loading) return <p>Loading models...</p>;
    if (error) return <p>Error loading models: {error.message}</p>;

    const filteredModels = data.findBrandModels.filter((model) => {
        const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType === 'All' || model.type.toLowerCase() === selectedType.toLowerCase();
        return matchesSearch && matchesType;
    });

    const paginatedModels = filteredModels.slice(page * limit, (page + 1) * limit);
    const totalPages = Math.ceil(filteredModels.length / limit);

    return (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '20px' }}>
            {/* Header */}
            <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Check out this section</h1>

            {/* Search & Filter */}
            <div
                style={{
                    marginBottom: '30px',
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '10px',
                    flexWrap: 'wrap',
                }}
            >
                <input
                    type="text"
                    placeholder="Search models by name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{
                        padding: '10px',
                        width: '220px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                    }}
                />
                <select
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                    style={{
                        padding: '10px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                    }}
                >
                    {guitarTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Guitar Grid */}
            <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gridTemplateRows: 'repeat(2, auto)',
                    gap: '20px',
                }}
            >
                {paginatedModels.map((model) => (
                    <div
                        key={model.id}
                        style={{
                            border: '1px solid #ddd',
                            borderRadius: '8px',
                            padding: '10px',
                            textAlign: 'center',
                            background: '#fff',
                        }}
                    >
                        <Link href={`/models/${brandId}/${model.id}`}>
                            <img
                                src={model.image}
                                alt={model.name}
                                style={{
                                    width: '100%',
                                    height: '250px',
                                    objectFit: 'contain',
                                    marginBottom: '10px',
                                }}
                            />
                            <h3 style={{ margin: '10px 0' }}>{model.name}</h3>
                            <p
                                style={{
                                    fontWeight: 'bold',
                                    color: '#444',
                                }}
                            >
                                ${model.price}
                            </p>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div
                style={{
                    marginTop: '30px',
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'center',
                }}
            >
                <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
                    Previous
                </button>
                <span>
          Page {page + 1} of {totalPages}
        </span>
                <button onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))} disabled={page >= totalPages - 1}>
                    Next
                </button>
            </div>
        </div>
    );
}
