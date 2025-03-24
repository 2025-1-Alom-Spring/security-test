import styled from "styled-components"

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  gap: 2rem;
  padding: 3rem 1rem;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

export const FormContainer = styled.div`
    width: 100%;
    max-width: 28rem;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 2rem;
`

export const ResultContainer = styled.div`
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
`

// Logo and title section
export const LogoSection = styled.div`
  text-align: center;
`

export const Logo = styled.img`
  height: 10rem;
  width: auto;
  margin: 0 auto;
`

export const Title = styled.h2`
  margin-top: 1.5rem;
  font-size: 1.875rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #1f2937;
`

// Form elements
export const FormCard = styled.div`
  background-color: white;
  padding: 2rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

export const FormLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
`

export const InputWrapper = styled.div`
  position: relative;
  margin-top: 0.25rem;
`

export const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  padding-left: 0.75rem;
  pointer-events: none;
  color: #9ca3af;
`

export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem 0.5rem 2.5rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  font-size: 0.875rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
  
  &::placeholder {
    color: #9ca3af;
  }
`

export const Button = styled.button`
  position: relative;
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 0.5rem 0.75rem;
  background-color: var(--primary-color);
  color: white;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.375rem;
  border: none;
  cursor: pointer;
  
  &:hover {
    background-color: #333333;
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  }
`

export const ToggleText = styled.div`
  font-size: 0.875rem;
  text-align: center;
`

export const ToggleButton = styled.button`
  font-weight: 500;
  color: var(--primary-color);
  background: none;
  border: none;
  cursor: pointer;
  
  &:hover {
    color: #333333;
  }
`

// Result panel
export const ResultCard = styled.div`
  background-color: white;
  padding: 2rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  border-radius: 0.5rem;
  min-height: 400px;
`

export const ResultTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`

export const ResultContent = styled.div`
  color: ${(props) => (props.type === "success" ? "#059669" : props.type === "error" ? "#DC2626" : "#4B5563")};
  
  background-color: ${(props) =>
    props.type === "success" ? "#F0FDF4" : props.type === "error" ? "#FEF2F2" : "transparent"};
  
  padding: ${(props) => (props.type !== "info" ? "1rem" : "0")};
  border-radius: 0.375rem;
`

export const ResultIconWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  
  svg {
    flex-shrink: 0;
    margin-top: 0.125rem;
  }
`

