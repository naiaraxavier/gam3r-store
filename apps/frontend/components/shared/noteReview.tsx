import {
  IconStar,
  IconStarFilled,
  IconStarHalfFilled,
} from "@tabler/icons-react";

export interface NoteReviewProps {
  note: number;
  size?: number;
}

const NotaReview = ({ note, size }: NoteReviewProps) => {
  const noteForStar = (note: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (note >= i) {
        stars.push(<IconStarFilled size={size ?? 12} />);
      } else if (note >= i - 0.5) {
        stars.push(<IconStarHalfFilled size={size ?? 12} />);
      } else {
        stars.push(<IconStar size={size ?? 12} />);
      }
    }
    return stars;
  };

  return (
    <div className="flex gap-0.5 text-emerald-400">{noteForStar(note)}</div>
  );
};

export default NotaReview;
