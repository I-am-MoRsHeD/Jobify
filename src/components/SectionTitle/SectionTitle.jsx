

// eslint-disable-next-line react/prop-types
const SectionTitle = ({ title }) => {
    return (
        <div className="pb-5">
            <h1 className="text-2xl font-bold text-center">{title}</h1>
            <div className="divider w-1/3 mx-auto"></div>
        </div>
    );
};

export default SectionTitle;