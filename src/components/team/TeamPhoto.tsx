import type { HTMLAttributes } from 'react';
import type { TeamMember } from '@/data/team';

interface TeamPhotoProps extends HTMLAttributes<HTMLDivElement> {
  member: TeamMember;
}

/** 4:5 portrait frame. Uses the member's `photoCrop` to zoom full-length photos in on the face. */
export function TeamPhoto({ member, className = '', ...rest }: TeamPhotoProps) {
  const crop = member.photoCrop;
  return (
    <div {...rest} className={`aspect-[4/5] overflow-hidden rounded-2xl shadow-lg ${className}`}>
      <img
        src={member.photo}
        alt={`${member.name}, ${member.title}`}
        width={800}
        height={1000}
        loading="lazy"
        className="h-full w-full object-cover object-top"
        style={crop ? { transform: `scale(${crop.zoom})`, transformOrigin: crop.focus } : undefined}
      />
    </div>
  );
}
