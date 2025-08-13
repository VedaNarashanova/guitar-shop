'use client';

import { useParams } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../../styling/SecondPage.css';
import '../../styling/header.css';
import Footer from '../../components/footer';
import Header from '../../components/header';


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

        <div className="home-container">
            <div>
                <Link href="/" className="back-button">← Back to brands</Link>
            </div><br/><br/>
            {/* Header with dynamic title */}
            <Header title="Browse top quality Guitars online" />

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




    // return (
    //     <div className="home-container"> {/* use same class as homepage */}
    //
    //
    //
    //         {/* Back button */}
    //         <div style={{ marginBottom: '20px' }}>
    //             <Link href="/" className="back-button">← Back to brands</Link>
    //         </div>
    //
    //         {/* Header component */}
    //         <Header title="Check out this section" />
    //
    //         {/* Search & Filter */}
    //         <div className="controls">
    //             <input
    //                 type="text"
    //                 placeholder="Search models by name"
    //                 value={searchTerm}
    //                 onChange={(e) => setSearchTerm(e.target.value)}
    //                 className="search-input"
    //             />
    //             <select
    //                 value={selectedType}
    //                 onChange={(e) => setSelectedType(e.target.value)}
    //                 className="select-input"
    //             >
    //                 {guitarTypes.map((type) => (
    //                     <option key={type} value={type}>
    //                         {type}
    //                     </option>
    //                 ))}
    //             </select>
    //         </div>
    //
    //         {/* Guitar Grid */}
    //         <div className="grid">
    //             {paginatedModels.map((model) => (
    //                 <div key={model.id} className="card">
    //                     <Link href={`/models/${brandId}/${model.id}`}>
    //                         <img src={model.image} alt={model.name} className="card-image" />
    //                         <h3 className="card-title">{model.name}</h3>
    //                         <p className="price">${model.price}</p>
    //                     </Link>
    //                 </div>
    //             ))}
    //         </div>
    //
    //         {/* Pagination */}
    //         <div className="pagination">
    //             <button
    //                 onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
    //                 disabled={page === 0}
    //             >
    //                 Previous
    //             </button>
    //             <span>
    //       Page {page + 1} of {totalPages}
    //     </span>
    //             <button
    //                 onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
    //                 disabled={page >= totalPages - 1}
    //             >
    //                 Next
    //             </button>
    //         </div>
    //
    //         <Footer />
    //     </div>
    // );
    // return (
    //     <div className="container">
    //         {/* Top bar */}
    //         <div className="top-bar">
    //             <button className="back-button" onClick={() => setPage(0)}>Back</button>
    //
    //             <div className="left-top">
    //                 <div className="vibestring">
    //                     VibeStrings
    //                     <span className="small-orange-dot"></span>
    //                 </div>
    //                 <h1 className="play-pro">PLAY LIKE A PRO</h1>
    //             </div>
    //
    //             <div className="big-orange-dot"></div>
    //         </div>
    //
    //         {/* Main content */}
    //         <div className="main-content">
    //             <h1 className="header">Check out this section</h1>
    //
    //             {/* Search & Filter */}
    //             <div className="controls">
    //                 <input
    //                     type="text"
    //                     placeholder="Search models by name"
    //                     value={searchTerm}
    //                     onChange={(e) => setSearchTerm(e.target.value)}
    //                     className="search-input"
    //                 />
    //                 <select
    //                     value={selectedType}
    //                     onChange={(e) => setSelectedType(e.target.value)}
    //                     className="select-input"
    //                 >
    //                     {guitarTypes.map((type) => (
    //                         <option key={type} value={type}>
    //                             {type}
    //                         </option>
    //                     ))}
    //                 </select>
    //             </div>
    //
    //             {/* Guitar Grid */}
    //             <div className="grid">
    //                 {paginatedModels.map((model) => (
    //                     <div key={model.id} className="card">
    //                         <Link href={`/models/${brandId}/${model.id}`}>
    //                             <img src={model.image} alt={model.name} className="card-image" />
    //                             <h3 className="card-title">{model.name}</h3>
    //                             <p className="price">${model.price}</p>
    //                         </Link>
    //                     </div>
    //                 ))}
    //             </div>
    //
    //             {/* Pagination */}
    //             <div className="pagination">
    //                 <button
    //                     onClick={() => setPage((prev) => Math.max(prev - 1, 0))}
    //                     disabled={page === 0}
    //                 >
    //                     Previous
    //                 </button>
    //                 <span>
    //       Page {page + 1} of {totalPages}
    //     </span>
    //                 <button
    //                     onClick={() => setPage((prev) => Math.min(prev + 1, totalPages - 1))}
    //                     disabled={page >= totalPages - 1}
    //                 >
    //                     Next
    //                 </button>
    //             </div>
    //         </div>
    //
    //         <Footer />
    //     </div>
    // );

}