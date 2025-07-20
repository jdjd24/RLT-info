You have a Streamlit app defined in `app.py` that displays PBM treatment plans per study in tabular form. I will supply you with a JSON list of new study objects—in the exact format produced by your deep research prompt. Your task is to:

1. **Merge** the new studies into the existing `protocols` list in `app.py`, preserving all fields:
   - indication, study, url, wavelength, dose, frequency, quality, notes
2. **Rebuild** the DataFrame generator (`make_df`) so it dynamically reads from the updated `protocols` list.
3. **Ensure** the “Session Time” column continues to calculate using the inverse‑square adjusted irradiance at `d_intended`.
4. **Maintain** the table layout: columns in this order—Study, Wavelength, Dose (J/cm²), Freq (×/week), Session Time, Distance (in), Quality, Notes.
5. **Add** an optional checkbox in the sidebar: “Show only high‑quality studies (quality ≥ 8)”. When checked, filter out protocols with `quality < 8`.
6. **Refactor** to cache the DataFrame creation for performance using `@st.cache_data`.
7. **Preserve** the caption showing actual irradiance at the intended distance.

Output the full updated `app.py` file, with clear comments marking where the new data integration and the quality‑filter feature have been added.
