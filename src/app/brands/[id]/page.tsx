'use client';

import { useRouter, useParams } from 'next/navigation';
import { gql, useQuery } from '@apollo/client';
import { useState } from 'react';
import {type} from "os";

const FIND_BRAND_MODELS = gql`
  query FindBrandModels($id: ID!, $sortBy: sortBy!) {
    findBrandModels(id: $id, sortBy: $sortBy) {
      id
      name
      type
    }
  }
`;

export default function BrandModelsPage() {
    const params = useParams();
    const brandId = params.id;

    //hardcoding the types of guitar
    const guitarTypes=["All","Electric","Acoustic","Bass"];
    const[selectedType, setSelectedType] =useState("All");

    //for the search bar
    const [searchTerm, setSearchTerm] = useState('');

    const sortBy = { field: "name", order: "ASC" };

    const { loading, error, data } = useQuery(FIND_BRAND_MODELS, {
        variables: { id: brandId, sortBy },
    });

    if (loading) return <p>Loading models...</p>;
    if (error) return <p>Error loading models: {error.message}</p>;

    // Filter models locally based on search term (case insensitive)
    // const filteredModels = data.findBrandModels.filter((model: {name:string}) =>
    // model.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const filteredModels = data.findBrandModels.filter((model) => {
        const matchesSearch = model.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = selectedType ==="All" || model.type.toLowerCase() === selectedType.toLowerCase();
        return matchesSearch && matchesType;
    })

    return (
        <div>
            <h1>Models for brand {brandId}</h1>
            {/*The Search Bar*/}
            <input
                type="text"
                placeholder="Search models by name"
                value={searchTerm}
                onChange={ (e) => setSearchTerm(e.target.value)}
            />
            {/*The Dropdown*/}
            <select value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}>
                {guitarTypes.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>

            <ul>
                {/*{data.findBrandModels.map((model: { id: string; name: string; type: string }) => (*/}
                {/*{filteredModels.map((model: {id:string; name:string; type:string}) =>*/}
                {filteredModels.map((model) => (
                    <li key={model.id}>
                        {model.name} - {model.type}
                    </li>
                ))}
            </ul>
        </div>
    );
}
