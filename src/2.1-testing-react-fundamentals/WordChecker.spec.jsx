import WordChecker from "./WordChecker";
import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const setup = (ui) => ({
    user: userEvent.setup(),
    ...render(ui),
});
test("shows good word when the word is correct", async ()=>{
    const { user } = setup(<WordChecker/>);
    const input = screen.getByLabelText(/enter a word/i);
    await user.type(input, "house");

    expect(screen.getByText(/good word/i)).toBeInTheDocument();

});

test("shows bad word when word is too long", async ()=>{
    const {user} = setup(<WordChecker maxLength={10}/>);
    const input = screen.getByLabelText(/enter a word/i);
    await user.type(input, "understandable");
    expect(screen.getByRole("alert")).toBeInTheDocument();
});