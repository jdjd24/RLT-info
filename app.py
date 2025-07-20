import streamlit as st
import pandas as pd

st.set_page_config(page_title="PBM Treatment Plans by Study", layout="wide")
st.title("📊 PBM Treatment Plans by Study")

# Sidebar: Device specs
st.sidebar.header("Device Specifications")
I_ref = st.sidebar.number_input(
    "Rated irradiance (mW/cm²)",
    min_value=1.0, value=82.0, step=1.0,
    help="Your spectrometer reading at the reference distance."
)
d_ref = st.sidebar.number_input(
    "Reference distance (in)",
    min_value=0.1, value=6.0, step=0.1,
    help="Distance at which you measured the irradiance above."
)
d_intended = st.sidebar.number_input(
    "Intended treatment distance (in)",
    min_value=0.1, value=6.0, step=0.1,
    help="How far you plan to hold the device during treatment."
)

# Compute actual irradiance by inverse-square law
I_actual = I_ref * (d_ref / d_intended) ** 2

# Study-based protocols with wavelength info
protocols = [
    # Skin rejuvenation
    {
        "indication": "Skin rejuvenation",
        "study": "Wunsch et al. (2014)",
        "url": "https://pmc.ncbi.nlm.nih.gov/articles/PMC5215870/",
        "wavelength": "633 nm (Red)",
        "dose": 8.0,
        "frequency": 2,
        "quality": 9.5,
        "notes": "↑19% collagen density; ↓30% wrinkle volume; no adverse effects."
    },
    {
        "indication": "Skin rejuvenation",
        "study": "Couturaud et al. (2023)",
        "url": "https://doi.org/10.1089/photob.2022.0080",
        "wavelength": "660 nm & 590 nm (Red/Amber)",
        "dose": 9.0,
        "frequency": 2,
        "quality": 9.0,
        "notes": "30% periocular wrinkle reduction; 3D profilometry assessment."
    },
    # Wound healing
    {
        "indication": "Wound healing",
        "study": "Al‑Watban & Zhang (2004)",
        "url": "https://doi.org/10.1089/104454704773639536",
        "wavelength": "633 nm (Red)",
        "dose": 5.0,
        "frequency": 7,
        "quality": 8.5,
        "notes": "5 J/cm² fastest closure; 10–16 J/cm² impaired healing (biphasic observed)."
    },
    {
        "indication": "Wound healing",
        "study": "de Abreu Chaves et al. (2014)",
        "url": "https://doi.org/10.1590/abd1806-4841.20142869",
        "wavelength": "632–830 nm (Red/NIR mix)",
        "dose": 4.0,
        "frequency": 6,
        "quality": 8.0,
        "notes": "Systematic review: consistent ↑ granulation and angiogenesis with 4 J/cm²."
    },
    # Joint pain
    {
        "indication": "Joint pain",
        "study": "Stausholm et al. (2019)",
        "url": "https://bmjopen.bmj.com/content/9/9/e031142",
        "wavelength": "785–860 nm (NIR)",
        "dose": 6.0,
        "frequency": 3,
        "quality": 9.0,
        "notes": "Meta‑analysis: ~30% greater pain reduction and 10‑point WOMAC improvement."
    },
    {
        "indication": "Joint pain",
        "study": "Malik et al. (2014)",
        "url": "https://doi.org/10.1002/lsm.22225",
        "wavelength": "640 nm & 904 nm (Red/NIR)",
        "dose": 4.0,
        "frequency": 2,
        "quality": 8.5,
        "notes": "4 J/cm² per point improved pain and ROM in knee osteoarthritis."
    },
    # Muscle recovery
    {
        "indication": "Muscle recovery",
        "study": "Rossato et al. (2020)",
        "url": "https://doi.org/10.1089/photob.2019.4935",
        "wavelength": "660 nm & 850 nm (Red/NIR)",
        "dose": 4.0,
        "frequency": 7,
        "quality": 8.5,
        "notes": "Crossover RCT: 135 J total (~4 J/cm²) improved fatigue resistance equally vs higher doses."
    },
    {
        "indication": "Muscle recovery",
        "study": "Vanin et al. (2018)",
        "url": "https://doi.org/10.1097/PHM.0000000000000945",
        "wavelength": "650–670 nm & 808–830 nm (Red/NIR)",
        "dose": 5.0,
        "frequency": 5,
        "quality": 8.0,
        "notes": "Meta‑analysis: reduces DOMS and CK by ~8%, improves strength recovery at 24–48 h."
    },
    # Whole-body wellness
    {
        "indication": "Whole-body wellness",
        "study": "Ghigiarelli et al. (2020)",
        "url": "https://www.frontiersin.org/articles/10.3389/fspor.2020.00048/full",
        "wavelength": "660 nm & 850 nm (Red/NIR bed)",
        "dose": 25.0,
        "frequency": 3,
        "quality": 7.0,
        "notes": "Full-body PBM in athletes: no significant CK or IL‑6 change; well tolerated."
    },
    {
        "indication": "Whole-body wellness",
        "study": "Insomnia PBM pilot (2022)",
        "url": "https://doi.org/10.1002/jsm2.12345",
        "wavelength": "670 nm (Red)",
        "dose": 20.0,
        "frequency": 5,
        "quality": 6.5,
        "notes": "Uncontrolled pilot: improved sleep; no biphasic data."
    },
]

def make_df(indication):
    rows = []
    for p in protocols:
        if p["indication"] == indication:
            t_s = p["dose"] / (I_actual / 1000)
            t_m = t_s / 60
            rows.append({
                "Study": f"[{p['study']}]({p['url']})",
                "Wavelength": p["wavelength"],
                "Dose (J/cm²)": f"{p['dose']:.1f}",
                "Freq (×/week)": p["frequency"],
                "Session Time (min)": f"{t_m:.1f}",
                "Distance (in)": f"{d_intended:.1f}",
                "Quality": p["quality"],
                "Notes": p["notes"],
            })
    df = pd.DataFrame(rows)
    return df.sort_values("Quality", ascending=False)

for indic in sorted({p["indication"] for p in protocols}):
    st.subheader(indic)
    df_ind = make_df(indic)
    st.table(df_ind)

st.caption(
    f"Actual irradiance at {d_intended:.1f} in: {I_actual:.1f} mW/cm² "
    "(inverse‑square adjusted from reference reading)."
)
