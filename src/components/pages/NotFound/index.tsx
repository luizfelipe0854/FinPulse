import { Button, Text } from "@/components/atoms"

import { useNavigate } from "react-router-dom"

export const NotFoundPage = () => {
    const navigate = useNavigate();
    return(
        <div className="w-full h-screen flex flex-col items-center justify-center">
            <Text variant="title" size="6xl">404</Text>
            <Text variant="subtitle" size="md">
                Página não encontrada
            </Text>
            <Button label="Voltar para a Home" variant="primary" className="mt-4 p-2" onClick={() => navigate("/")} />
        </div>
    )

}