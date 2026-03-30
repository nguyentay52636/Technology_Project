import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
}

export default function ProductPagination({
  currentPage,
  totalPages,
  onPrevious,
  onNext,
}: ProductPaginationProps) {
  return (
    <div className="flex items-center justify-between mt-8">
      <Button
        onClick={onPrevious}
        disabled={currentPage === 1}
        variant="outline"
        className="gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Trước
      </Button>

      <div className="text-sm text-gray-600">
        Trang {currentPage} / {totalPages}
      </div>

      <Button
        onClick={onNext}
        disabled={currentPage === totalPages}
        variant="outline"
        className="gap-2"
      >
        Sau
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
