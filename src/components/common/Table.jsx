import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const Table = ({
    columns,
    data,
    onRowClick,
    className = '',
    emptyMessage = 'Không có dữ liệu',
    responsive = true,
    mobileCardView = true
}) => {
    const [expandedRows, setExpandedRows] = useState(new Set());

    const toggleRow = (index) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedRows(newExpanded);
    };

    // Desktop Table View
    const DesktopTable = () => (
        <div className={`overflow-x-auto ${className}`}>
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        {columns.map((column, index) => (
                            <th
                                key={index}
                                className={`
                  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                  ${column.className || ''}
                `}
                            >
                                {column.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={columns.length}
                                className="px-6 py-8 text-center text-sm text-gray-500"
                            >
                                {emptyMessage}
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                onClick={() => onRowClick && onRowClick(row)}
                                className={onRowClick ? 'hover:bg-gray-50 cursor-pointer transition-colors' : ''}
                            >
                                {columns.map((column, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className={`px-6 py-4 whitespace-nowrap text-sm ${column.cellClassName || ''}`}
                                    >
                                        {column.cell 
                                            ? column.cell(row[column.accessor], row, rowIndex) 
                                            : column.render 
                                                ? column.render(row)
                                                : row[column.accessor]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );

    // Mobile Card View
    const MobileCards = () => (
        <div className="space-y-4">
            {data.length === 0 ? (
                <div className="text-center py-8 text-sm text-gray-500 bg-white rounded-lg">
                    {emptyMessage}
                </div>
            ) : (
                data.map((row, rowIndex) => (
                    <div
                        key={rowIndex}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                    >
                        {/* Card Header - Always visible */}
                        <div
                            className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => mobileCardView ? toggleRow(rowIndex) : onRowClick && onRowClick(row)}
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    {/* Show first column as title */}
                                    <div className="font-medium text-gray-900 truncate">
                                        {columns[0].cell 
                                            ? columns[0].cell(row[columns[0].accessor], row, rowIndex)
                                            : columns[0].render
                                                ? columns[0].render(row)
                                                : row[columns[0].accessor]
                                        }
                                    </div>
                                    {/* Show second column as subtitle if exists */}
                                    {columns[1] && (
                                        <div className="text-sm text-gray-500 mt-1 truncate">
                                            {columns[1].cell 
                                                ? columns[1].cell(row[columns[1].accessor], row, rowIndex)
                                                : columns[1].render
                                                    ? columns[1].render(row)
                                                    : row[columns[1].accessor]
                                            }
                                        </div>
                                    )}
                                </div>
                                {mobileCardView && (
                                    <button
                                        className="flex-shrink-0 text-gray-400 touch-target"
                                        aria-label={expandedRows.has(rowIndex) ? "Thu gọn" : "Mở rộng"}
                                    >
                                        {expandedRows.has(rowIndex) ? (
                                            <ChevronUp className="w-5 h-5" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5" />
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Card Body - Expandable */}
                        {mobileCardView && expandedRows.has(rowIndex) && (
                            <div className="px-4 pb-4 pt-2 border-t border-gray-100 space-y-3">
                                {columns.slice(2).map((column, colIndex) => (
                                    <div key={colIndex} className="flex justify-between items-start gap-3">
                                        <span className="text-sm font-medium text-gray-500 flex-shrink-0">
                                            {column.header}:
                                        </span>
                                        <span className="text-sm text-gray-900 text-right flex-1">
                                            {column.cell 
                                                ? column.cell(row[column.accessor], row, rowIndex)
                                                : column.render
                                                    ? column.render(row)
                                                    : row[column.accessor]
                                            }
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );

    return (
        <>
            {/* Desktop View */}
            {responsive && <div className="hidden md:block"><DesktopTable /></div>}
            
            {/* Mobile View */}
            {responsive && mobileCardView && <div className="md:hidden"><MobileCards /></div>}
            
            {/* Non-responsive mode */}
            {!responsive && <DesktopTable />}
        </>
    );
};

export default Table;
