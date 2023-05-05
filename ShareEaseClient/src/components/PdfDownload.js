import React from 'react';
import { Button } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const PDFDownloadButton = ({ data }) => {
  const handleDownload = () => {
    const doc = new jsPDF();

    // Create table from data
    const tableData = [
      ['ID', data.id],
      ['Owner ID', data.ownerId],
      ['Borrower ID', data.borrowerId],
      ['Resource Name', data.resource.name],
      ['Status', data.status],
      ['Date', data.date],
    ];
    doc.autoTable({
      head: [['Field', 'Value']],
      body: tableData,
    });

    // Download the PDF
    doc.save('data.pdf');
  };

  return (
    <Button colorScheme="brand" size="sm" onClick={handleDownload}>
      Download
    </Button>
  );
};

export default PDFDownloadButton;
