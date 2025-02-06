import React from "react";
import {Link} from "react-router-dom";
import "./Section.css"

const Section = ({ title, children, flug }) => {
    return (
        <section className="mb-5 section-container">
            <div className=" section-container-top">
                <h2 className="text-center">{title}</h2>
                { flug ?
                        ( <Link className="link-primary" to={"/"}>Дивитись всi</Link>)
                        :
                        (<div></div>)
                }

            </div>
            <div>
                {children}
            </div>
        </section>
    );
};

export default Section;