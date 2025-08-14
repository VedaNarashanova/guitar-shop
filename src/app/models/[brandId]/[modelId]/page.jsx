"use client";

import {gql, useQuery} from "@apollo/client";
import { useParams } from 'next/navigation';
import { useState } from 'react';
import { translations} from "../../../../lib/translations";
import Link from 'next/link';
import Header from '../../../components/header';
import '../../../styling/header.css';
import '../../../styling/ThirdPage.css';
import Footer from "../../../components/footer";


const FIND_MODEL_BY_ID = gql`
  query FindModelById($brandId: ID!, $modelId: ID!) {
    findUniqueModel(brandId: $brandId, modelId: $modelId) {
      id
      name
      type
      image
      description
      price
      specs {
        bodyWood
        neckWood
        fingerboardWood
        pickups
        tuners
        scaleLength
        bridge
      }
      musicians {
        name
        musicianImage
        bands
      }
    }
  }
`;

export default function ModelDetailsPage() {
    const params = useParams();
    const { brandId, modelId } = params;

    const { loading, error, data } = useQuery(FIND_MODEL_BY_ID, {
        variables: {  brandId, modelId },
    });

    const [tab, setTab] = useState('specs'); // 'specs' or 'musicians'
    const [musicianPage, setMusicianPage] = useState(0);

    //for language translation
    const [lang, setLang] = useState("en");
    const t = translations[lang];

    const musiciansPerPage = 1;//i put this so theres only one artist per seeing, i did it becuase many of the guitars had only 2 artist, and so i wanted to check if it works, so i kept it at 1

    if (loading) return <p>{t.loading}</p>;
    if (error) return <p>{t.error}l: {error.message}</p>;

    const model = data.findUniqueModel;


    const musicians = model.musicians || [];
    const start = musicianPage * musiciansPerPage;
    const paginatedMusicians = musicians.slice(start, start + musiciansPerPage);

    const totalPages = Math.ceil(musicians.length / musiciansPerPage);

    const { image, name } = data.findUniqueModel;

    return (
        <div className="home-container">
            <Link href={`/brands/${brandId}`} className="back-button">← Back to models</Link>


            <Header className="page3-header"
                title="Active Precision Bass® PH V"
                logo={model.image} // Guitar image in circle
            />



            <div className="tabs-row" style={{ display: 'flex', justifyContent: 'space-between', margin: '2rem 0' }}>
                <button onClick={() => setTab('specs')} disabled={tab === 'specs'}>
                    {t.specs}
                </button>
                <button onClick={() => setTab('musicians')} disabled={tab === 'musicians'}>
                    {t.musicians}
                </button>
            </div>

            {/* Main content area */}
            <div className="tab-content">
                {tab === 'specs' && (
                    <div className="left-column">
                        {/*<h2>{t.specs}</h2>*/}

                        {/* Guitar description */}
                        {model.description && (
                            <p className="guitar-description">{model.description}</p>
                        )}
                        <br/>
                        <ul>
                            <li>Body Wood: {model.specs.bodyWood}</li>
                            <li>Neck Wood: {model.specs.neckWood}</li>
                            <li>Fingerboard Wood: {model.specs.fingerboardWood}</li>
                            <li>Pickups: {model.specs.pickups}</li>
                            <li>Tuners: {model.specs.tuners}</li>
                            <li>Scale Length: {model.specs.scaleLength}</li>
                            <li>Bridge: {model.specs.bridge}</li>
                        </ul>
                    </div>
                )}


                {tab === 'musicians' && (
                    <div className="right-column">
                        <ul>
                            {paginatedMusicians.map((musician, idx) => (
                                <li key={idx}>
                                    <strong>{musician.name}</strong>
                                    <br />
                                    {t.bands}: {musician.bands.join(', ')}
                                    <br />
                                    {musician.musicianImage && (
                                        <img src={musician.musicianImage} alt={musician.name} width={100} />
                                    )}
                                </li>
                            ))}
                        </ul>
                        <div className="musician-pagination">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setMusicianPage(i)}
                                    disabled={i === musicianPage}
                                    className={i === musicianPage ? 'active-dot' : ''}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>


            <div style={{ marginTop: "2rem" }}>
                <button onClick={() => setLang("en")} disabled={lang === "en"}>English</button>
                <span style={{ margin: "0 1rem" }}>|</span> {/* separator */}
                <button onClick={() => setLang("mk")} disabled={lang === "mk"}>Македонски</button>
            </div>
            <br/>
            <Footer />
        </div>
    );


}