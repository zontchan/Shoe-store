export default function ErrorMessage({text}) {
    return (
        <div className={'error'}>
            <p className="h4 text-center">{text}</p>
            <p className="text-center">Пожалуйста, попробуйте снова!</p>
        </div>
    );
}