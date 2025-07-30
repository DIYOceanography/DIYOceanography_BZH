.. diyoceanbzh documentation master file, created
   from pynsitu doc on 16/04/2024


DIY Oceanography BZH
====================

**DIY Oceanography BZH** gathers useful resources for the development of open Do-It-Yourself oceanographic instrumentation, see more :doc:`the more detailed description of our motivation and objectives <why-DIY-Oceanography-BZH>`.

We are very much open to feedbacks and contributions, please refer to :doc:`associated guides <contributor_guide>`.

.. General
.. --------

.. toctree::
   :maxdepth: 1
   :caption: General information

   why-DIY-Oceanography-BZH
   contributor_guide
   whats-new

.. Variables & sensors
.. -------------------

.. toctree::
   :maxdepth: 1
   :caption: Variables & sensors

   temperature/temperature
   conductivity/conductivity
   oxygen/oxygen
   fluorescence/fluorescence
   turbidity/turbidity
   currents/currents
   Geopositioning/geopositioning

DIY instruments
----------------


.. jupyter-execute::
   :hide-code:

   import pandas as pd
   from IPython.display import HTML

   # Load DIY instruments CSV file with custom styling
   diy_df = pd.read_csv("temperature/DIY-instrument.csv", 
                        sep=';',
                        na_values=['', 'NaN', 'nan']).set_index("EOV / EBV")

   # Clean column names
   diy_df = diy_df.rename(columns=lambda x: x.strip())

   # Custom styling for DIY instruments table
   diy_html_style = """
   <style>
   .diy-table {
       border-collapse: collapse;
       margin: 25px 0;
       font-size: 0.9em;
       font-family: sans-serif;
       min-width: 400px;
       box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
       border-radius: 8px;
       overflow: hidden;
   }
   .diy-table thead tr {
       background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
       color: #ffffff !important;
       text-align: left;
       font-weight: bold;
   }
   .diy-table thead th {
       background: transparent !important;
       color: #ffffff !important;
       padding: 15px 12px;
       border: none;
   }
   .diy-table tbody tr {
       border-bottom: 1px solid #dddddd;
       transition: all 0.3s ease;
   }
   .diy-table tbody tr:nth-of-type(even) {
       background-color: #f8f9ff;
   }
   .diy-table tbody tr:nth-of-type(odd) {
       background-color: #ffffff;
   }
   .diy-table tbody tr:hover {
       background: linear-gradient(135deg, #667eea15 0%, #764ba215 100%);
       transform: scale(1.01);
       box-shadow: 0 5px 15px rgba(0,0,0,0.1);
   }
   .diy-table td {
       padding: 12px 15px;
       border: 1px solid #e8e8e8;
   }
   .diy-table tbody tr {
       border-left: 4px solid #667eea;
   }
   .diy-table tbody tr:nth-child(3n) {
       border-left: 4px solid #764ba2;
   }
   .diy-table tbody tr:nth-child(3n+1) {
       border-left: 4px solid #48c6ef;
   }
   .project-name {
       font-weight: bold;
       color: #2c3e50;
       font-size: 1.1em;
   }
   .cost-cell {
       font-weight: bold;
       color: #27ae60;
   }
   .status-complete {
       background-color: #2ecc71;
       color: white;
       padding: 4px 8px;
       border-radius: 12px;
       font-size: 0.8em;
   }
   .status-ongoing {
       background-color: #f39c12;
       color: white;
       padding: 4px 8px;
       border-radius: 12px;
       font-size: 0.8em;
   }
   .status-planned {
       background-color: #3498db;
       color: white;
       padding: 4px 8px;
       border-radius: 12px;
       font-size: 0.8em;
   }
   </style>
   """

   # Convert DataFrame to HTML with custom styling
   def style_diy_table(df):
       html_table = df.to_html(render_links=True, 
                               escape=False, 
                               na_rep="—",
                               index=True,
                               classes=['diy-table'],
                               table_id='diy-instruments-table')
       
       # Add project icons and styling based on content
       html_table = html_table.replace('<tr>', '<tr class="diy-project">')
       
       # Style project names in index with contextual French emojis
       for idx in df.index:
           if pd.notna(idx):
               # Choose emoji based on French oceanographic terms
               emoji = "🔧"  # default
               idx_lower = str(idx).lower()
               
               if "poisson" in idx_lower:
                   emoji = "🐟"  # fish
               elif "plancton" in idx_lower:
                   emoji = "🦠"  # microorganism/plankton
               elif "zooplancton" in idx_lower:
                   emoji = "🦐"  # zooplankton
               elif "courant" in idx_lower:
                   emoji = "🌊"  # ocean current
               elif "salinité" in idx_lower:
                   emoji = "🧂"  # salt
               elif "température" in idx_lower:
                   emoji = "🌡️"  # thermometer
               elif "fluorescence" in idx_lower:
                   emoji = "💡"  # light/fluorescence
               elif "turbidité" in idx_lower:
                   emoji = "☁️"  # turbidity/cloudiness
               elif "profondeur" in idx_lower:
                   emoji = "📏"  # depth measurement
               elif "elevation" in idx_lower:
                   emoji = "📈"  # elevation/level
               
               html_table = html_table.replace(f'<th>{idx}</th>', 
                                             f'<th class="project-name">{emoji} {idx}</th>')
       
       # Style cost cells (assuming there might be cost-related columns)
       cost_keywords = ['cost', 'price', '€', '$', 'budget']
       for keyword in cost_keywords:
           html_table = html_table.replace(f'>{keyword}', f' class="cost-cell">{keyword}')
       
       # Style status indicators if present
       html_table = html_table.replace('Complete', '<span class="status-complete">Complete</span>')
       html_table = html_table.replace('Ongoing', '<span class="status-ongoing">Ongoing</span>')
       html_table = html_table.replace('Planned', '<span class="status-planned">Planned</span>')
       
       return html_table

   # Create the styled table
   diy_styled_table = style_diy_table(diy_df)

   # Display the table
   display(HTML(diy_html_style + diy_styled_table))

