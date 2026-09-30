import { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X, SearchX } from 'lucide-react';
import { PageHero } from '../components/Hero.jsx';
import FilterPanel, { EMPTY_FILTERS, applyFilters } from '../components/FilterPanel.jsx';
import VehicleCard from '../components/VehicleCard.jsx';
import { useToast } from '../components/Toast.jsx';
import { IMAGES, vehicles, vehicleTypes, formatPrice } from '../data/vehicles.js';

const LABELS = {
  make: (v) => v, model: (v) => v, type: (v) => v, transmission: (v) => v, fuel: (v) => v, availability: (v) => v,
  minPrice: (v) => `From ${formatPrice(+v)}`, maxPrice: (v) => `Up to ${formatPrice(+v)}`,
  minYear: (v) => `${v}+`, maxKm: (v) => `< ${(+v).toLocaleString('en-AU')} km`,
};

const SORTS = {
  recommended: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0),
  priceAsc: (a, b) => a.price - b.price,
  priceDesc: (a, b) => b.price - a.price,
  yearDesc: (a, b) => b.year - a.year,
  kmAsc: (a, b) => a.km - b.km,
};

export default function BuyCar() {
  const toast = useToast();
  const [draft, setDraft] = useState(EMPTY_FILTERS);
  const [applied, setApplied] = useState(EMPTY_FILTERS);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recommended');
  const [showFilters, setShowFilters] = useState(false);

  const results = useMemo(() => applyFilters(vehicles, applied, query).sort(SORTS[sort]), [applied, query, sort]);
  const active = Object.entries(applied).filter(([, v]) => v);

  const apply = (next = draft) => {
    setApplied(next);
    setShowFilters(false);
    toast(`${applyFilters(vehicles, next, query).length} vehicles match your search`);
  };
  const reset = () => { setDraft(EMPTY_FILTERS); setApplied(EMPTY_FILTERS); setQuery(''); };
  const removeOne = (k) => { const next = { ...applied, [k]: '', ...(k === 'make' ? { model: '' } : {}) }; setDraft(next); setApplied(next); };
  const quickType = (t) => { const next = { ...applied, type: applied.type === t ? '' : t }; setDraft(next); setApplied(next); };

  return (
    <>
      <PageHero
        image={IMAGES.hero}
        crumbs={[{ label: 'Buy a Car' }]}
        eyebrow="Marketplace"
        title="Find Your Next Car"
        text="Quality used vehicles across Darwin, Palmerston and the Top End — with photos, videos, specifications and clear pricing."
      />
      <section className="section-sm">
        <div className="container">
          <div className="plp-top">
            <form className="plp-search" onSubmit={(e) => { e.preventDefault(); apply(); }} role="search">
              <Search size={19} />
              <input className="input" placeholder="Search make, model or keyword — e.g. 'HiLux', 'hybrid', 'SUV'" value={query}
                onChange={(e) => setQuery(e.target.value)} aria-label="Search vehicles" />
            </form>
            <button className="btn btn-outline filter-toggle" onClick={() => setShowFilters(!showFilters)} aria-expanded={showFilters}>
              <SlidersHorizontal size={17} />{showFilters ? 'Hide filters' : 'Filters'}{active.length > 0 && ` (${active.length})`}
            </button>
          </div>

          <div className="type-pills" role="group" aria-label="Quick filter by vehicle type">
            <button className={!applied.type ? 'on' : ''} onClick={() => quickType('')}>All vehicles</button>
            {vehicleTypes.map((t) => <button key={t} className={applied.type === t ? 'on' : ''} onClick={() => quickType(t)}>{t}</button>)}
          </div>

          <div className="plp">
            <FilterPanel draft={draft} setDraft={setDraft} onApply={() => apply()} onReset={reset} open={showFilters} />
            <div>
              <div className="plp-meta">
                <div>
                  <strong>{results.length} {results.length === 1 ? 'vehicle' : 'vehicles'}</strong>
                  <span className="muted" style={{ fontSize: 14 }}> available in Darwin & surrounds</span>
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, fontWeight: 600 }}>
                  Sort
                  <select className="select" style={{ height: 42, width: 'auto' }} value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="recommended">Recommended</option>
                    <option value="priceAsc">Price: low to high</option>
                    <option value="priceDesc">Price: high to low</option>
                    <option value="yearDesc">Year: newest first</option>
                    <option value="kmAsc">Kilometres: lowest</option>
                  </select>
                </label>
              </div>
              {active.length > 0 && (
                <div className="chips" style={{ marginBottom: 20 }}>
                  {active.map(([k, v]) => (
                    <span className="chip" key={k}>{LABELS[k](v)}<button onClick={() => removeOne(k)} aria-label={`Remove ${k} filter`}><X size={14} /></button></span>
                  ))}
                  <button className="btn-link btn" style={{ fontSize: 13.5 }} onClick={reset}>Clear all</button>
                </div>
              )}
              {results.length ? (
                <div className="vehicle-grid">{results.map((v) => <VehicleCard key={v.id} vehicle={v} />)}</div>
              ) : (
                <div className="card empty">
                  <SearchX size={44} />
                  <h3>No vehicles match your search</h3>
                  <p className="muted">Try widening your price range or removing a filter.</p>
                  <button className="btn btn-primary" style={{ marginTop: 20 }} onClick={reset}>Reset filters</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
