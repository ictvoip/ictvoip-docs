Importing CDRs
==============

.. note::

   The import tool will NOT overwrite existing CDRs. Existing records for the selected Domain/Tenant/Extension are preserved. Only new CDRs from the import file will be added. This ensures safe, non-destructive imports.

Currently, importing supports CDRs exported from FusionPBX versions 5.0.x, 5.1.x, and 5.3.8. The tool checks for existing records and only imports new CDRs.

**Step 1: Select Tenant and Extension**

.. image:: ../_static/images/admin/cdr-import-step1-select-tenant.png
   :width: 800px
   :align: center
   :alt: Select Tenant and Extension

*Figure: Select the tenant and extension for CDR import.*

**Step 2: Upload CSV File**

.. image:: ../_static/images/admin/cdr-import-step2-upload-csv.png
   :width: 800px
   :align: center
   :alt: Upload CSV File

*Figure: Browse and select your exported CDR CSV file.*

**Step 3: Map Columns (if applicable)**

.. image:: ../_static/images/admin/cdr-import-step3-map-columns.png
   :width: 800px
   :align: center
   :alt: Map CSV Columns

*Figure: Map CSV columns to FusionPBX fields if prompted.*

**Step 4: Confirm and Import**

.. image:: ../_static/images/admin/cdr-import-step4-confirm.png
   :width: 800px
   :align: center
   :alt: Confirm Import

*Figure: Confirm the import and monitor progress. Large files may take longer to process.*

*The import process will skip any CDRs that already exist for the selected tenant/extension, ensuring no data is overwritten.*

Version Support
---------------

- This tool supports CDRs exported from FusionPBX versions 5.0.x, 5.1.x, and 5.3.8.

Troubleshooting
---------------

- If you encounter errors, verify the CSV format and that all required extensions exist.
- Check logs for detailed error messages. 