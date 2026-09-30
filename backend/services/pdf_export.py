import io
import logging

logger = logging.getLogger('ats_resume_scorer')


def generate_combined_pdf(html_docs: dict) -> bytes:
    """Convert a dict of HTML strings to a single merged PDF using xhtml2pdf.

    Falls back to a minimal plain-text PDF if xhtml2pdf is unavailable.
    """
    try:
        from xhtml2pdf import pisa

        # Merge all HTML pages into one document separated by page-breaks
        merged_html = ""
        for i, (name, html_str) in enumerate(html_docs.items()):
            # Inject a page-break between sections (not before the first one)
            if i > 0:
                merged_html += '<div style="page-break-before: always;"></div>\n'
            merged_html += html_str

        output = io.BytesIO()
        result = pisa.CreatePDF(io.StringIO(merged_html), dest=output)
        if result.err:
            raise RuntimeError(f"xhtml2pdf reported {result.err} error(s) while rendering PDF")
        return output.getvalue()

    except ImportError:
        logger.error("xhtml2pdf not installed — run: pip install xhtml2pdf")
        raise ImportError("PDF generation requires xhtml2pdf. Run: pip install xhtml2pdf")