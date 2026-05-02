import DOMPurify from 'dompurify';

interface Props {
  children: string;
}

export function InnerHTML({ children }: Props) {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: DOMPurify.sanitize(children)
      }}
    />
  )
}