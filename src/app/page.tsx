'use client';

import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import './styling/HomePage.css';
import './styling/header.css';
import Footer from './components/footer';
import Header from './components/header';
import homeImage from '/public/images/homeimage.jpg';



const brandLogos = {
    'Fender': 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Fender_logo.png',
    'Ibanez': 'https://upload.wikimedia.org/wikipedia/commons/3/34/Ibanez_logo.svg',
    'Gibson': 'https://upload.wikimedia.org/wikipedia/commons/5/51/Gibson_Guitar_logo.svg',
    'PRS': 'https://upload.wikimedia.org/wikipedia/commons/b/ba/PRS_Guitars_logo.svg',
    'Martin': 'https://upload.wikimedia.org/wikipedia/commons/c/cf/Martin_co_optimized_cleaned.svg',
    'Yamaha': 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Yamaha_logo.svg',
    'Gretsch': 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Gretsch_company_logo.png',
    'Epiphone': 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Epiphone_guitars_logo.svg',
    'Jackson':'https://upload.wikimedia.org/wikipedia/commons/a/a6/Jackson_guitars_logo.svg',
    'Music Man': 'https://upload.wikimedia.org/wikipedia/en/e/ee/Ernie_ball_music_man_logo.png',

};

const GET_BRANDS = gql`
  query GetBrands {
    findAllBrands {
      id
      name
    }
  }
`;

export default function HomePage() {

  const { loading, error, data } = useQuery(GET_BRANDS);


  if (loading) return <p>Loading brands...</p>;
  if (error) return <p>Error loading brands: {error.message}</p>;

    return (
        <div className="home-container">
            <div className="div-header">
                <Header
                    title={<>Browse top quality <span className="orange-text">Guitars</span> online</>}
                    somethign="Explore 50k+ latest collections of branded guitars online with VibeStrings."
                //    logo="/images/homeimage.jpg"
                />
            </div>

            {/* Brands section */}
            <div  className="home-title">
                <h1>Featuring the best brands</h1>
                <h4>Select your preferred brand and explore our exquisite collection.</h4>
            </div>
             <ul className="brand-list">
                {data.findAllBrands.map((brand: { id: string; name: string }) => (
                    <li key={brand.id} className="brand-item">
                        {brandLogos[brand.name] ? (
                            <Link href={`/brands/${brand.id}`}>
                                <img
                                    src={brandLogos[brand.name]}
                                    alt={brand.name}
                                    className="brand-logo"
                                    style={{ cursor: 'pointer' }}
                                />
                            </Link>
                        ) : (
                            <Link href={`/brands/${brand.id}`} className="brand-link">
                                {brand.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ul>


            <div className="features-section">
                <div className="features-line"></div>
                <div className="features-text-container">
                    <div className="feature">SMOOTH BROWSING</div>
                    <div className="feature">EASY DELIVERY</div>
                    <div className="feature">SWIFT PAYMENT</div>
                </div>
            </div>


            <div className="hero-section-container">
                <div className="hero-text">
                    <h1>Browse and buy your own guitar with VibeString</h1>
                </div>

                <div className="hero-image-wrapper">
                    <div className="big-orange-circle"></div>
                    <div className="hero-image">
                        <img src="/images/guitar1.png" alt="Guitar1" />
                        <img src="/images/guitar2.png" alt="Guitar2" />
                    </div>
                </div>
            </div>


            <Footer />
        </div>
    );

}