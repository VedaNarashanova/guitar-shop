'use client';

import { useParams } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../../styling/SecondPage.css';
import '../../styling/header.css';
import Footer from '../../components/footer';
import Header from '../../components/header';

const brandLogos = {
    '1': 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Fender_logo.png',
    '2': 'https://upload.wikimedia.org/wikipedia/commons/3/34/Ibanez_logo.svg',
    '3': 'https://upload.wikimedia.org/wikipedia/commons/5/51/Gibson_Guitar_logo.svg',
    '4': 'https://upload.wikimedia.org/wikipedia/commons/b/ba/PRS_Guitars_logo.svg',
    '5': 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Martin_co_optimized_cleaned.svg',
    '6': 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Yamaha_logo.svg',
    '7': 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Gretsch_company_logo.png',
    '8': 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Epiphone_guitars_logo.svg',
    '9':'https://upload.wikimedia.org/wikipedia/commons/a/a6/Jackson_guitars_logo.svg',
    '10': 'https://upload.wikimedia.org/wikipedia/en/e/ee/Ernie_ball_music_man_logo.png',
};


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
    console.log("brandId:", brandId);
    console.log("logo url:", brandLogos[brandId]);

    return (

        <div className="home-container">
            <div>
                <Link href="/" className="back-button">← Back to brands</Link>
            </div>
            {/* Header with dynamic title */}
            <div className="header2">
                <Header title="Play like a rockstar"
                        logo={brandLogos[brandId]}/>
            </div>


            <div className="selection-section">
                <h1>
                    Check out the <span className="orange-text">Selection</span>
                </h1>
                <div className="controls">
                    <input
                        type="text"
                        placeholder="Search models by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="select-input"
                    >
                        {guitarTypes.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            </div>


            {/* Guitar Grid */}
            <div className="grid">
                {paginatedModels.map((model) => (
                    <div key={model.id} className="card">
                        <Link href={`/models/${brandId}/${model.id}`}>
                            <img src={model.image} alt={model.name} className="card-image" />
                            <h3 className="card-title">{model.name}</h3>
                            <p className="price">${model.price}</p>
                        </Link>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="pagination">
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
                    disabled={page === 0}
                >
                    Previous
                </button>
                <span>
          Page {page + 1} of {totalPages}
        </span>
                <button
                    onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
                    disabled={page >= totalPages - 1}
                >
                    Next
                </button>
            </div>

            <Footer />
        </div>
    );

}