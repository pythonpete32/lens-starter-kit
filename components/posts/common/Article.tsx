interface Props {
  content: string;
}

export function Article(props: Props) {
  const markdown = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type taining Lorem Ipsum passages, and more rece"

  return (
    <div className="flex py-6">
      <article className="prose lg:prose-xl text-left">
        {props.content}
      </article>
    </div>
  );
}
