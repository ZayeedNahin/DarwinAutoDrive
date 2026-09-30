import { SlidersHorizontal, RotateCcw, Search } from 'lucide-react';
import { SelectInput } from './FormFields.jsx';
import { makes, vehicles, vehicleTypes, transmissions, fuelTypes } from '../data/vehicles.js';

export const EMPTY_FILTERS = {
  make: '', model: '', type: '', minPrice: '', maxPrice: '', minYear: '', transmission: '', fuel: '', maxKm: '', availability: '',
};

const priceOpts = [15000, 20000, 30000, 40000, 50000, 60000, 80000, 100000].map((n) => ({ value: String(n), label: `$${n.toLocaleString('en-AU')}` }));
const yearOpts = [2023, 2022, 2021, 2020, 2019, 2018].map((y) => ({ value: String(y), label: `${y} or newer` }));
const kmOpts = [20000, 40000, 60000, 100000, 150000].map((n) => ({ value: String(n), label: `Under ${n.toLocaleString('en-AU')} km` }));

/** Marketplace search & filter panel. Edits a draft; parent applies it. */
export default function FilterPanel({ draft, setDraft, onApply, onReset, open }) {
  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v, ...(k === 'make' ? { model: '' } : {}) }));
  const models = [...new Set(vehicles.filter((v) => !draft.make || v.make === draft.make).map((v) => v.model))].sort();

  return (
    <aside className={`card filters ${open ? 'open' : ''}`} aria-label="Search filters">
      <div className="filters-head">
        <h3><SlidersHorizontal size={18} color="#F97316" />Filters</h3>
        <button className="btn-link btn" style={{ fontSize: 13.5 }} onClick={onReset}><RotateCcw size={14} />Reset</button>
      </div>
      <form onSubmit={(e) => { e.preventDefault(); onApply(); }}>
        <SelectInput label="Make" name="make" value={draft.make} onChange={set} options={makes} placeholder="Any make" />
        <SelectInput label="Model" name="model" value={draft.model} onChange={set} options={models} placeholder="Any model" />
        <SelectInput label="Vehicle Type" name="type" value={draft.type} onChange={set} options={vehicleTypes} placeholder="Any type" />
        <div className="field">
          <span className="label">Price Range</span>
          <div className="range-row">
            <select className="select" aria-label="Minimum price" value={draft.minPrice} onChange={(e) => set('minPrice', e.target.value)}>
              <option value="">Min</option>
              {priceOpts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
            <select className="select" aria-label="Maximum price" value={draft.maxPrice} onChange={(e) => set('maxPrice', e.target.value)}>
              <option value="">Max</option>
              {priceOpts.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </div>
        </div>
        <SelectInput label="Year" name="minYear" value={draft.minYear} onChange={set} options={yearOpts} placeholder="Any year" />
        <SelectInput label="Transmission" name="transmission" value={draft.transmission} onChange={set} options={transmissions} placeholder="Any" />
        <SelectInput label="Fuel Type" name="fuel" value={draft.fuel} onChange={set} options={fuelTypes} placeholder="Any fuel" />
        <SelectInput label="Kilometres" name="maxKm" value={draft.maxKm} onChange={set} options={kmOpts} placeholder="Any kilometres" />
        <SelectInput label="Availability" name="availability" value={draft.availability} onChange={set} options={['Available', 'Under Offer', 'Coming Soon']} placeholder="All listings" />
        <div className="filters-actions">
          <button type="submit" className="btn btn-primary btn-block"><Search size={17} />Search / Apply Filters</button>
        </div>
      </form>
    </aside>
  );
}

export function applyFilters(list, f, q) {
  const query = q.trim().toLowerCase();
  return list.filter((v) =>
    (!query || `${v.title} ${v.type} ${v.fuel} ${v.colour}`.toLowerCase().includes(query)) &&
    (!f.make || v.make === f.make) &&
    (!f.model || v.model === f.model) &&
    (!f.type || v.type === f.type) &&
    (!f.minPrice || v.price >= +f.minPrice) &&
    (!f.maxPrice || v.price <= +f.maxPrice) &&
    (!f.minYear || v.year >= +f.minYear) &&
    (!f.transmission || v.transmission === f.transmission) &&
    (!f.fuel || v.fuel === f.fuel) &&
    (!f.maxKm || v.km <= +f.maxKm) &&
    (!f.availability || v.availability === f.availability)
  );
}
